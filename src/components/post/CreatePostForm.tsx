
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Image, X, Paperclip, Tag, MapPin } from "lucide-react";
import { toast } from "sonner";

const CreatePostForm = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...filesArray]);
    }
  };
  
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const removeImage = () => {
    setImagePreview(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = () => {
    if (!content.trim()) {
      toast.error("Please add some content to your post");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate post creation
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Post created successfully!");
      navigate('/feed');
    }, 1500);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create a Post</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Share your achievements, projects, or startup updates..."
              className="resize-none min-h-[120px] mb-3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            {imagePreview && (
              <div className="relative mb-3 rounded-md overflow-hidden border">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-[300px] w-full object-contain bg-black/5"
                />
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-2 right-2 w-8 h-8 rounded-full"
                  onClick={removeImage}
                >
                  <X size={16} />
                </Button>
              </div>
            )}
            
            {attachments.length > 0 && (
              <div className="mb-3">
                <h4 className="text-sm font-medium mb-1">Attachments</h4>
                <div className="space-y-1">
                  {attachments.map((file, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-2 rounded bg-muted"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <Paperclip size={14} />
                        <span>{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(file.size / 1024).toFixed(0)} KB)
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0" 
                        onClick={() => removeAttachment(index)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {tags.map(tag => (
                  <div 
                    key={tag} 
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    #{tag}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 rounded-full"
                      onClick={() => removeTag(tag)}
                    >
                      <X size={12} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Button variant="ghost" size="icon" className="text-muted-foreground" type="button" onClick={() => imageInputRef.current?.click()}>
                  <Image size={18} />
                </Button>
                <Input 
                  ref={imageInputRef}
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground" 
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip size={18} />
                <Input 
                  ref={fileInputRef}
                  type="file" 
                  className="hidden" 
                  multiple
                  onChange={handleAttachmentChange}
                />
              </Button>
              <div className="relative flex-1">
                <div className="flex items-center border rounded-md pl-2">
                  <Tag size={16} className="text-muted-foreground" />
                  <Input 
                    placeholder="Add tags..."
                    className="border-0"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <MapPin size={18} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="outline" className="mr-2" onClick={() => navigate('/feed')}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting || !content.trim()}>
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePostForm;
