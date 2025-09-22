import React from 'react';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success('Copié dans le presse-papiers !');
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden my-4 relative">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-900">
        <span className="text-xs font-semibold text-gray-400 uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1 text-xs"
        >
          <Copy className="w-3 h-3" />
          <span>Copier</span>
        </button>
      </div>
      <pre className="p-4 text-sm text-white overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
