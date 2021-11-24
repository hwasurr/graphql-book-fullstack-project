import { Field, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Cut } from './Cut';
import User from './User';

@Entity()
@ObjectType()
export class CutVote extends BaseEntity {
  @PrimaryColumn()
  @Field(() => Int)
  userId: number;

  @PrimaryColumn()
  @Field(() => Int)
  cutId: number;

  @Field(() => Cut)
  cut: Cut;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.cutVotes)
  user: User;
}
