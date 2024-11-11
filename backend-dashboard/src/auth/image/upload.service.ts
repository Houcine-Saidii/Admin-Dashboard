import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveImage(file: Express.Multer.File, userId: string): Promise<string> {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const uploadPath = path.join(uploadDir, file.originalname);
    try {
      fs.writeFileSync(uploadPath, file.buffer);
    } catch (error) {
      this.logger.error(`Failed to write file: ${error.message}`);
      throw new Error('Failed to write file');
    }
    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid userId');
    }
    const imageUrl = `http://localhost:3001/uploads/${file.originalname}`;

    let user;
    try {
      user = await this.userRepository.findOne({ where: { id: Number(userId) } });
    } catch (error) {
      this.logger.error(`Failed to find user: ${error.message}`);
      throw new Error('User not found');
    }

    if (user) {
      user.imageUrl = imageUrl;
      try {
        await this.userRepository.save(user);
      } catch (error) {
        this.logger.error(`Failed to save user: ${error.message}`);
        throw new Error('Failed to save user');
      }
    } else {
      this.logger.error('User not found');
      throw new Error('User not found');
    }

    return imageUrl;
  }
}
