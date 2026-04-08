

//*
interface PopupProp{
    title: string
    content: string
    onClose:  () => void
}//*/

const Popup : React.FC<PopupProp> = ({title, content, onClose}) => {


  return (
    // Overlay for the background
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      // Content container
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p>{content}</p>
        <button onClick={onClose} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;