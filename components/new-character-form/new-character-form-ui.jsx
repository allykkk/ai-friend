"use client";

// shadcn-ui components
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Our upload component
import ImageUpload from "../image-upload";

// Icons
import { Wand2 } from "lucide-react";

const NewCharacterFormUI = ({
  form,
  onSubmit,
  preamble,
  databaseDefinitions,
  isEditMode,
}) => {
  const isLoading = form.formState.isSubmitting;

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-6 space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              General Information
            </h2>
            <p className="text-sm text-muted-foreground">
              General information about your friend
            </p>
          </div>
          <Separator className="my-4" />

          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4">
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Elon Musk"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI friend will be named.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="CEO & Founder of Teska, SpaceX"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI friend
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {databaseDefinitions.categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your AI
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-12 space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Configuration
            </h2>
            <p className="text-sm text-muted-foreground">
              Detailed instructions for AI behavior
            </p>
          </div>
          <Separator className="my-4" />

          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={6}
                    disabled={isLoading}
                    placeholder={preamble}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your character&apos;s backstory and
                  relevant details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="seed"
            control={form.control}
            render={({ field }) => {
              console.log(form)
              console.log(field)
              return(
              <FormItem className="mt-6">
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-y-4">
                    <div className="flex flex-row gap-x-4">
                      <span className="pt-2 basis-12">User:</span>
                      <Textarea
                        className="bg-background resize-none"
                        disabled={isLoading}
                        rows={4}
                        placeholder="Hey, how's your day going?"
                        value={field.value.userSeed}
                        onChange={(event) =>
                          field.onChange({
                            ...field.value,
                            userSeed: event.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex flex-row gap-x-4">
                      <span className="pt-2 basis-12">Friend:</span>
                      <Textarea
                        className="bg-background resize-none"
                        disabled={isLoading}
                        rows={6}
                        placeholder="Hey, how's your day going?"
                        value={field.value.assistantSeed}
                        onChange={(event) =>
                          field.onChange({
                            ...field.value,
                            assistantSeed: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Describe a simple conversation between you and your friend.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}}
          />
          <div className="mt-6 w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              {isEditMode ? "Edit" : "Create"}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewCharacterFormUI;
