"use client";

import { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';

interface PostForm {
  title: string;
  content: string;
  featuredImage: string;
}

export default function NewPostPage() {
  const router = useRouter();
  const editorRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostForm>({
    title: '',
    content: '',
    featuredImage: ''
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_upload_preset'); // Ganti dengan upload preset Anda

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`, // Ganti dengan cloud name Anda
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      setPost(prev => ({ ...prev, featuredImage: data.secure_url }));
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const content = editorRef.current?.getContent();
      const postData = {
        ...post,
        content,
        status: 'draft',
        createdAt: new Date().toISOString(),
      };

      // TODO: Simpan ke Firebase
      console.log('Saving post:', postData);
      
      router.push('/admin/posts');
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create New Post</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Post Title
          </label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Featured Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          <div className="mt-1 flex items-center gap-4">
            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border rounded-md hover:bg-gray-50">
              <Upload size={20} />
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {post.featuredImage && (
              <img 
                src={post.featuredImage} 
                alt="Preview" 
                className="h-20 w-20 object-cover rounded"
              />
            )}
          </div>
        </div>

        {/* TinyMCE Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue=""
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </form>
    </div>
  );
}