"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";
import type { FavoriteLocation } from "@/entities/favoriteLocation";
import { useRenameFavoriteLocations } from "@/entities/favoriteLocation";
import { Button } from "@/shared/ui/button";
import { DialogFooter, DialogHeader } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";

interface RenameFavoriteLocationDialogButtonProps {
  favoriteLocation: FavoriteLocation;
}

export function RenameFavoriteLocationDialogButton({
  favoriteLocation,
}: RenameFavoriteLocationDialogButtonProps) {
  const { mutate: renameFavoriteLocation, isPending } =
    useRenameFavoriteLocations();

  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState(favoriteLocation.displayName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName.trim()) {
      return;
    }

    renameFavoriteLocation(
      {
        favoriteLocation,
        displayName: displayName.trim(),
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon" title="이름 변경">
          <Pencil className="h-4 w-4" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background p-6 shadow-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <Dialog.Title className="text-lg font-semibold">
              이름 변경
            </Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground">
              즐겨찾기 위치의 이름을 수정하세요.
            </Dialog.Description>
          </DialogHeader>

          <div className="mt-4">
            <Input
              autoFocus
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="이름 입력"
            />
          </div>

          <DialogFooter className="mt-6">
            <Dialog.Close asChild>
              <Button type="button" variant="outline">
                취소
              </Button>
            </Dialog.Close>
            <Button type="submit" disabled={isPending}>
              저장
            </Button>
          </DialogFooter>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
