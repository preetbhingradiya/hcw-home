import { Controller, Post, Req, Body, UseGuards, } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { OrganisationService } from './organisation.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Role } from 'src/constant/role.constant';
import { Roles } from 'src/auth/decorator/role.decorator';

@ApiTags('Organisation')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('organisation')
export class OrganisationConstroller{
    constructor(private readonly organisationService: OrganisationService) { }

    @ApiOperation({ summary: 'Create Organization use of this API' })
    @Post('create')
    @Roles(Role.Admin)
    createOrganization(
      @Req() request,
      @Body() createOrganisationDto : CreateOrganisationDto
    ) {
      return this.organisationService.createOrganization(request, createOrganisationDto);
    }
}