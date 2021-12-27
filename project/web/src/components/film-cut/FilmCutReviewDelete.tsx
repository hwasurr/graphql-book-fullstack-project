import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { CutQuery, useDeleteCutReviewMutation } from '../../generated/graphql';

interface FilmCutReviewDeleteAlertProps {
  target?: CutQuery['cutReviews'][0];
  isOpen: boolean;
  onClose: () => void;
}
function FilmCutReviewDeleteAlert({
  target,
  isOpen,
  onClose,
}: FilmCutReviewDeleteAlertProps): React.ReactElement {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [deleteCutReview] = useDeleteCutReviewMutation();
  async function handleDelete() {
    if (target) {
      await deleteCutReview({
        variables: { id: target.id },
        update: (cache) => {
          cache.evict({ id: `CutReview:${target.id}` });
        },
      });
      onClose();
    }
  }
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            감상 삭제
          </AlertDialogHeader>

          <AlertDialogBody>
            감상을 삭제하시겠습니까? 되돌릴 수 없습니다.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              삭제
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
export default FilmCutReviewDeleteAlert;
