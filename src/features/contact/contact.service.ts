import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entitiy/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async create(contact: CreateContactDto): Promise<Contact> {
    const newUser = await this.contactRepository.save(contact);
    return newUser;
  }

  findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }
}
