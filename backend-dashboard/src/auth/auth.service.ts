import { Injectable, Logger, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.log(`Validating user: ${email}`);
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user && await bcrypt.compare(pass, user.password)) {
      this.logger.log(`User validated successfully`);
      const { password, ...result } = user;
      return result;
    }

    this.logger.warn(`User validation failed for email: ${email}`);
    throw new UnauthorizedException('Invalid credentials');
  }

  generateToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  }

  async updateUser(
    id: number,
    updateData: { name?: string; email?: string; currentPassword?: string; newpassword?: string; confirmPassword?: string }
  ): Promise<User> {
    this.logger.log(`Updating user with ID: ${id}`);
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      this.logger.warn(`User with ID ${id} not found`);
      throw new NotFoundException('User not found');
    }

    if (updateData.currentPassword && updateData.newpassword && updateData.confirmPassword) {
      if (!await bcrypt.compare(updateData.currentPassword, user.password)) {
        this.logger.warn(`Current password for user ID ${id} does not match`);
        throw new BadRequestException('Current password is incorrect');
      }
      if (updateData.newpassword !== updateData.confirmPassword) {
        this.logger.warn(`New password and confirm password for user ID ${id} do not match`);
        throw new BadRequestException('New password and confirm password do not match');
      }
      user.password = await bcrypt.hash(updateData.newpassword, await bcrypt.genSalt());
    }

    if (updateData.name) {
      user.name = updateData.name;
    }

    if (updateData.email) {
      user.email = updateData.email;
    }

    await this.usersRepository.save(user);
    this.logger.log(`User with ID ${id} updated successfully`);
    return user;
  }
}
