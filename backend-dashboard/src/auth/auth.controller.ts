import { Controller, Post, Body, UnauthorizedException, Put, Req, ParseIntPipe, Param, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MailerService } from './mailer/mailer.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private mailerService: MailerService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    const token = this.authService.generateToken(user);
    return { message: 'Login successful', user, token };
  }

  @Post('reset')
  async resetPassword(@Body() body: { email: string }) {
    if (body.email !== 'houcinesaidi40@gmail.com') {
      throw new UnauthorizedException('Unauthorized request');
    }
    await this.mailerService.sendPasswordReset();
    return { message: 'Password reset email sent to houcinesaidi40@gmail.com.' };
  }

  @Put('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: { name?: string; email?: string; currentPassword?: string; newpassword?: string; confirmPassword?: string },
  ) {
    this.logger.log(`Received update request for user ID: ${id}`);
    const updatedUser = await this.authService.updateUser(id, updateDto);
    return { message: 'User updated successfully', updatedUser };
  }
}
