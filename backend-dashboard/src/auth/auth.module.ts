import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { MailerService } from './mailer/mailer.service';
import { UploadController } from './image/upload.controller';  // Import UploadController
import { UploadService } from './image/upload.service';  // Import UploadService

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, MailerService, UploadService],  // Add UploadService
  controllers: [AuthController, UploadController],  // Add UploadController
})
export class AuthModule {}
