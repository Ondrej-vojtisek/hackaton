import { Button } from "@mantine/core";
import type { ContextModalProps } from "@mantine/modals";
import type { ReactNode } from "react";

export const TransactionDetailModal = ({ context, id, innerProps }: ContextModalProps<{ modalBody: ReactNode }>) => (
    <>
        {innerProps.modalBody}
        <Button variant="gradient" fullWidth mt="md" onClick={() => context.closeModal(id)}>
            Close detail
        </Button>
    </>
);
