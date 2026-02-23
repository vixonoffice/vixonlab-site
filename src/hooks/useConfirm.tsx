import { useState, useCallback } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type ConfirmState = { message: string; resolve: (v: boolean) => void } | null;

export function useConfirm() {
  const [state, setState] = useState<ConfirmState>(null);

  const confirm = useCallback((message: string): Promise<boolean> => {
    return new Promise((resolve) => setState({ message, resolve }));
  }, []);

  function handleConfirm() {
    state?.resolve(true);
    setState(null);
  }

  function handleCancel() {
    state?.resolve(false);
    setState(null);
  }

  const ConfirmDialog = (
    <AlertDialog open={!!state}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmare</AlertDialogTitle>
          <AlertDialogDescription>{state?.message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Anulează</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Confirmă</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return { confirm, ConfirmDialog };
}
