"use client";

import React, { ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { addProduct } from "@/app/actions";
import { toast } from "sonner";

const AddProductForm = ({ user }: any) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const result = await addProduct(url);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message || "Product tracked successfully!");
      setUrl("");
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row gap-2">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste product URL (Amazon, Walmart, Flipkart, etc.)"
            className="h-12 text-base"
            required
          />
          <Button
            className="bg-orange-500 hover:bg-orange-600 h-10 sm:h-12 px-8 cursor-pointer"
            type="submit"
            disabled={loading}
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Track Price"
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddProductForm;
