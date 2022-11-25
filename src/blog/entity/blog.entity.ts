import { Image } from './image.entity';
import { Category } from '../category/category.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany(() => Image, image => image.blog,{onDelete:"CASCADE"})
  images: Image[];
  @Column()
  title: string;
  @ManyToOne(() => Category, category => category.blogs, { onDelete: 'CASCADE' })
  category: Category;
  @Column()
  text: string;
  @OneToOne(() => Image, image => image.blog,{onDelete:"CASCADE"})
  @JoinColumn()
  avatar: Image;

  @ManyToOne(()=>User,user=>user.blogs)
  user:User
}