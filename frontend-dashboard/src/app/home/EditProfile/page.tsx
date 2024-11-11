"use client";
import React from "react";
import styles from "../home.module.css";
import { Button, Form, Input } from "antd";
import { RiUserSettingsLine } from "react-icons/ri";
import { LuKey } from "react-icons/lu";
import Upload from "../../Components/upload";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  types: {
    email: "${label} is not a valid email!",
  },
};

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    if (values.user.newpassword !== values.user.confirmPassword) {
      alert("Nouveau mot de passe et Confirmer mot de passe ne correspondent pas");
      return;
    }

    const userId = 1;
    try {
      const response = await fetch(
        `http://localhost:3001/auth/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values.user),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("User updated:", data);
        alert("Profile updated successfully");
        localStorage.setItem("userName", values.user.name); // Store the name in localStorage
      } else {
        throw new Error("Profile update failed");
      }
    } catch (err) {
      alert("An error occurred while updating the profile");
    }
  };

  return (
    <div className={styles.home_section}>
      <div className={styles.upload}>
        <Upload />
      </div>
      <div className={styles.wrapper}>
        <Form
          {...layout}
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
          form={form}
        >
          <div className={styles.title}>
            <RiUserSettingsLine className={styles.account} />
            <h5>Modifier le Profile</h5>
          </div>
          <Form.Item name={["user", "name"]} label="Nom">
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[{ type: "email" }]}
          >
            <Input />
          </Form.Item>
          <div className={styles.title}>
            <LuKey className={styles.account} />
            <h5>Changer le Mot de passe</h5>
          </div>
          <Form.Item
            name={["user", "currentPassword"]}
            label="Mot de passe actuel"
          >
            <Input.Password placeholder="Mot de passe actuel" />
          </Form.Item>
          <Form.Item name={["user", "newpassword"]} label="Nouveau mot de passe">
            <Input.Password placeholder="Nouveau mot de passe" />
          </Form.Item>
          <Form.Item
            name={["user", "confirmPassword"]}
            label="Confirmer mot de passe"
          >
            <Input.Password placeholder="Confirmer mot de passe" />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
            <Button type="primary" htmlType="submit">
              Enregistrer les Modification
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ProfilePage;
