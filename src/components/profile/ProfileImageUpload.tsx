
import { ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { ImageIcon, Upload } from "lucide-react";
import { toast } from "sonner";

interface ProfileImageUploadProps {
  type: "avatar" | "cover";
  onImageSelected: (imageUrl: string) => void;
  currentImage?: string;
}

const ProfileImageUpload = ({ type, onImageSelected, currentImage }: ProfileImageUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image too large. Maximum size is 5MB.");
      return;
    }
    
    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImagePreview(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleSave = () => {
    if (imagePreview) {
      onImageSelected(imagePreview);
      toast.success(`Profile ${type} updated successfully!`);
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`${type === 'avatar' ? 'absolute bottom-0 right-0 rounded-full' : 'absolute bottom-4 right-4'}`}
        >
          <ImageIcon className="w-4 h-4 mr-1" />
          {type === "avatar" ? "Change Photo" : "Change Banner"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload {type === "avatar" ? "Profile Picture" : "Cover Image"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center gap-4">
            {imagePreview ? (
              <div className={`relative overflow-hidden ${type === 'avatar' ? 'w-32 h-32 rounded-full' : 'w-full h-40 rounded-md'}`}>
                <img 
                  src={imagePreview} 
                  alt={`Preview ${type}`} 
                  className={`${type === 'avatar' ? 'object-cover w-full h-full' : 'w-full h-full object-cover'}`} 
                />
              </div>
            ) : (
              <div className={`bg-muted flex items-center justify-center ${type === 'avatar' ? 'w-32 h-32 rounded-full' : 'w-full h-40 rounded-md'}`}>
                {currentImage ? (
                  <img 
                    src={currentImage} 
                    alt={`Current ${type}`} 
                    className={`${type === 'avatar' ? 'object-cover w-full h-full' : 'w-full h-full object-cover'}`} 
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
            )}
            
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Select Image
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleSave} disabled={!imagePreview}>Save</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileImageUpload;
