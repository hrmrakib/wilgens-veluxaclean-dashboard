"use client";
import { useRef, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import JoditEditor from "jodit-react";

const EditPrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Enter your updated privacy policy...",
      height: "60vh",
      style: {
        backgroundColor: "#232423",
        color: "#fff",
        padding: "10px",
      },
    }),
    []
  );

  const handleSave = () => {
    if (!content.trim()) {
      alert("Privacy Policy content cannot be empty!");
      return;
    }

    // Placeholder for API call
    console.log("Saved content:", content);
    alert("Privacy Policy saved successfully!");
  };

  console.log(content);
  return (
    <div className='min-h-[75vh] flex flex-col justify-between p-2.5 w-[98%] mx-auto bg-transparent rounded-md shadow-md'>
      <div className='space-y-6'>
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
          config={config}
          tabIndex={1}
        />
      </div>

      <div className='flex justify-end pt-6'>
        <Button
          style={{
            backgroundColor: "#033f4d",
            color: "#fff",
          }}
          onClick={handleSave}
          className='w-[400px] h-[56px] placeholder:text-[#999999] text-[18px] font-medium'
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditPrivacyPolicy;

// "use client";

// import { useEffect } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";

// const defaultContent = `
//   <h1>Terms and Conditions</h1> <br />
//   <p>Welcome to DesignDoc. By accessing or using our service, you agree to be bound by these Terms and Conditions.</p>

//   <h3>1. Acceptance of Terms</h3>
//   <p>By accessing or using the DesignDoc platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>

//   <h3>2. User Accounts</h3>
//   <p>To access certain features of the platform, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>

//   <h3>3. Subscription and Payments</h3>
//   <p>Some features of DesignDoc require a paid subscription. By subscribing to a paid plan, you agree to pay the fees associated with the selected plan. All payments are non-refundable unless otherwise specified.</p>

//   <h3>4. User Content</h3>
//   <p>You retain ownership of any content you submit to the platform. However, by submitting content, you grant DesignDoc a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content in connection with providing and promoting the service.</p>

//   <h3>5. Prohibited Activities</h3>
//   <p>You agree not to engage in any activity that interferes with or disrupts the service or servers connected to the platform. Prohibited activities include but are not limited to hacking, scraping, or introducing malware.</p>

//   <h3>6. Termination</h3>
//   <p>DesignDoc reserves the right to terminate or suspend your account and access to the service at any time, without prior notice or liability, for any reason.</p>

//   <h3>7. Changes to Terms</h3>
//   <p>We reserve the right to modify these Terms and Conditions at any time. Your continued use of the platform after such changes constitutes your acceptance of the new terms.</p>
// `;

// const EditAboutUs = () => {
//   useEffect(() => {
//     const loadQuill = async () => {
//       const Quill = (await import("quill")).default;

//       const editorContainer = document.getElementById("editor");

//       if (
//         editorContainer &&
//         !editorContainer.classList.contains("ql-container")
//       ) {
//         const quill = new Quill(editorContainer, {
//           theme: "snow",
//           placeholder: "Enter your update about us...",
//         });

//         quill.clipboard.dangerouslyPasteHTML(defaultContent);

//         quill.on("text-change", () => {
//           const html = quill.root.innerHTML;
//         });
//       }
//     };

//     if (typeof window !== "undefined") {
//       loadQuill();
//     }
//   }, []);

//   return (
//     <div className='min-h-[75vh] w-[96%] mx-auto flex flex-col justify-between gap-6'>
//       <div className='space-y-6'>
//         <div className='h-full'>
//           <div id='editor' className='h-[50vh] bg-white text-base' />
//         </div>
//       </div>
//       <div className='flex justify-end'></div>
//     </div>
//   );
// };

// export default EditAboutUs;
