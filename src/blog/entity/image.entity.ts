import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from './blog.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable:true})
  title: string;
  @Column({nullable:true})
  video:string
  @ManyToOne(()=>Blog,blog=>blog.images,{onDelete:"CASCADE"})
  blog:Blog

  @OneToOne(()=>Blog,blog=>blog.avatar,{onDelete:"CASCADE"})
  avatar:Blog;
}