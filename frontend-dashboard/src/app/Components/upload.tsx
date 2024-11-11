import React, { useState } from 'react';
import { Upload, message } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import eventBus from './eventBus';
import axios from 'axios';
import './App.css'; 

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const UploadComponent: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'avatar.png',
      status: 'done',
      url: '/avatar.png',
    },
  ]);

  const onChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList[0]?.originFileObj) {
      const formData = new FormData();
      formData.append('file', newFileList[0].originFileObj);
      formData.append('userId', '1');  // Replace with the actual user ID

      try {
        const response = await axios.post('http://localhost:3001/upload', formData);
        const imageUrl = response.data.imageUrl;

        // Update fileList with the new image URL
        setFileList((prevList) =>
          prevList.map((file) =>
            file.uid === newFileList[0].uid ? { ...file, url: imageUrl } : file
          )
        );

        eventBus.publish('imageChange', imageUrl);
      } catch (error) {
        message.error('Upload failed.');
      }
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotationSlider>
      <Upload
        action="http://localhost:3001/upload"  // This is not used anymore
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default UploadComponent;
