"use client";

import { useState } from "react";
import type { FavoriteLocation } from "@/entities/favoriteLocation/model/FavoriteLocation.type";
import type { Location } from "@/entities/location";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { useRenameFavoriteLocation } from "../renameFavoriteLocation/useRenameFavoriteLocation.model";

interface RenameFavoriteDialogProps {
  location: Location;
  currentName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * @description 즐겨찾기 별칭 수정 다이얼로그 컴포넌트입니다.
 */
export function RenameFavoriteDialog({
  location,
  currentName,
  isOpen,
  onOpenChange,
}: RenameFavoriteDialogProps) {
  const [newName, setNewName] = useState(currentName);
  const { mutate: rename, isPending } = useRenameFavoriteLocation();

  const handleRename = () => {
    if (!newName.trim()) return;

    rename(
      {
        favoriteLocation: location as FavoriteLocation,
        displayName: newName.trim(),
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>즐겨찾기 이름 수정</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="새 이름을 입력하세요"
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button
            onClick={handleRename}
            disabled={isPending || !newName.trim()}
          >
            {isPending ? "저장 중..." : "저장"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
