import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./Modal";
import { AnimatedButton } from "./AnimatedButton";

const meta: Meta = {
  title: "Atoms/Modal",
};

export default meta;

export const Playground: StoryObj = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false)
      return (
        <div>
          <AnimatedButton onClick={() => setOpen(true)}>모달 열기</AnimatedButton>
          <Modal isOpen={open} onClose={() => setOpen(false)} title="데모 모달">
            <div className="space-y-2">
              <p>모달 컨텐츠입니다.</p>
              <p>ESC 또는 바깥 클릭으로 닫을 수 있습니다.</p>
            </div>
          </Modal>
        </div>
      )
    }
    return <Demo />
  },
};


