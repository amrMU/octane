import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReadingIntervalsService } from './reading-intervals.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';


@Controller('reading-intervals')
export class ReadingIntervalsController {
  constructor(private readonly riService: ReadingIntervalsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body, @Request() req) {
    return this.riService.create({
      ...body,
      userId: req.user.sub, 
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMyIntervals(@Req() req) {
    return this.riService.findForUser(req.user.sub);
  }

  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  getAllIntervals() {
    return this.riService.findAll();
  }
} 
