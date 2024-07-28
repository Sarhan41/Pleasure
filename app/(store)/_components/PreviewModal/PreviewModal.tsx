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

  const isPackOfProduct = product.name.includes("Pack Of");

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 z-[100000] pl-4">
        <div className="sm:col-span-4 lg:col-span-5 ml-2">
          <Gallery images={product.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7 ml-10">
          <InfoModal data={product} userId={userId}   />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
