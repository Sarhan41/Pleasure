"use client";

import usePreviewModal from "@/hooks/store/use-preview-modal";
import Modal from "@/components/Store/Modal";
import Gallery from "../Gallery/Gallery-Modal";
import InfoModal from "../Info/InfoModal/Info";

const PreviewModal = ({ userId }: { userId?: string }) => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="flex flex-col items-start w-full gap-4 p-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex-1 w-full lg:w-2/5">
          <Gallery images={product.images.slice(0, 3)} />
        </div>
        <div className="flex-1 sm:w-1/2 lg:w-3/5">
          <InfoModal data={product} userId={userId} />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;