import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { Cut } from '../entities/Cut';
import { CutVote } from '../entities/CutVote';

type CutVoteKey = {
  cutId: Cut['id'];
};
export const createCutVoteLoader = (): DataLoader<CutVoteKey, CutVote[]> => {
  return new DataLoader<CutVoteKey, CutVote[]>(async (keys) => {
    const cutIds = keys.map((key) => key.cutId);
    const votes = await CutVote.find({ where: { cutId: In(cutIds) } });
    const result = keys.map((key) =>
      votes.filter((vote) => vote.cutId === key.cutId),
    );
    return result;
  });
};
