import type { Franchise, Office } from "@/types";

export type DetailsEntityType = "franchise" | "office";

export type DetailsEntityMap = {
  franchise: Franchise;
  office: Office;
};

export type DetailsModalProps<T extends DetailsEntityType> = {
  open: boolean;
  onClose: () => void;
  type: T;
  data: DetailsEntityMap[T] | null;
  onUpdated?: () => Promise<void> | void;
};
