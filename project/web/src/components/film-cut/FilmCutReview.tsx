import {
  Avatar,
  Box,
  Divider,
  Flex,
  HStack,
  IconButton,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { MdDelete, MdEdit } from 'react-icons/md';

interface FilmCutReviewProps {
  author: string;
  isMine: boolean;
  contents: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
}
export function FilmCutReview({
  author,
  isMine,
  contents,
  onEditClick,
  onDeleteClick,
}: FilmCutReviewProps): JSX.Element {
  return (
    <Box borderWidth="thin" borderRadius="lg" shadow="sm" p={2} minH={150}>
      <Flex spacing={2} p={2} justify="space-between">
        <HStack>
          <Avatar size="sm" />
          <Text>{author}</Text>
        </HStack>
        {isMine && (
          <HStack spacing={0}>
            <Tooltip hasArrow label="감상 수정">
              <IconButton
                aria-label="edit-review"
                variant="ghost"
                size="sm"
                icon={<MdEdit />}
                onClick={onEditClick}
              />
            </Tooltip>
            <Tooltip hasArrow label="감상 삭제">
              <IconButton
                aria-label="delete-review"
                variant="ghost"
                size="sm"
                icon={<MdDelete />}
                onClick={onDeleteClick}
              />
            </Tooltip>
          </HStack>
        )}
      </Flex>
      <Divider />
      <Box mt={2} p={2}>
        <Text>{contents}</Text>
      </Box>
    </Box>
  );
}
