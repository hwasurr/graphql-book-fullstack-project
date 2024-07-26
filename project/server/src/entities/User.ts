import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CutVote } from './CutVote';

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field({ description: '유저 이름'})
  @Column({ unique: true, comment: '유저 이름' })
  username: string
  
  @Field({ description: '유저 이메일' })
  @Column({ unique: true, comment: '유저 이메일' })
  email: string

  @Column({ comment: '비밀번호' })
  password: string

  @Field(() => String, { description: '생성 일자' })
  @CreateDateColumn({ comment: '생성일자' })
  createdAt: Date;
 
  @Column({ comment: '업데이트 일자' })
  updatedAt: Date;

  @OneToMany(() => CutVote, (cutVote) => cutVote.user)
  cutVotes: CutVote[];
}