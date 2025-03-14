import { useContext, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { LanguageContext } from "../../Context/LanguageContext";

const QrModal = () => {
  const host = window.location.origin; // Extracts only "https://host.com"
  const qrRef = useRef(null); 
  const { lang } = useContext(LanguageContext);

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const image = canvas.toDataURL("image/png"); 
    const link = document.createElement("a");
    link.href = image;
    link.download = "qr_code.png"; 
    link.click();
  };

  return (
    <dialog id="qrModal" className="modal">
      <div className="modal-box bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-black">
          {lang === "en" && "Scan This QR Code"}
          {lang === "ar" && "امسح رمز الاستجابة السريعة"}
          {lang === "kr" && "ئەم کۆدی QR بپشکنە"}
        </h3>
        <div className="w-full p-10 border rounded-lg flex justify-center items-center" ref={qrRef}>
          <QRCodeCanvas value={host} size={200} />
        </div>
        <div className="modal-action mt-4">
          <form method="dialog" className="w-full grid grid-cols-2 gap-2">
            {/* Download Button */}
            <button type="button" onClick={handleDownload} className="btn btn-info text-white">
              {lang === "en" && "Download"}
              {lang === "ar" && "تحميل"}
              {lang === "kr" && "داگرتن"}
            </button>
            {/* Close Button */}
            <button className="btn btn-error text-white">
              {lang === "en" && "Close"}
              {lang === "ar" && "إغلاق"}
              {lang === "kr" && "داخستن"}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default QrModal;
