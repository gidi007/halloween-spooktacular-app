"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flame, MessageSquare, Plus } from "lucide-react"

interface Story {
  id: number
  title: string
  content: string
  author: string
  likes: number
  comments: number
  category: string
}

interface HauntedPlace {
  name: string
  location: string
  description: string
  imageUrl: string
}

const initialStories: Story[] = [
  {
    id: 1,
    title: "The Haunted Mansion",
    content: "In a decrepit old mansion, a family moves in only to discover...",
    author: "GhostWriter",
    likes: 15,
    comments: 5,
    category: "Haunted Houses",
  },
  {
    id: 2,
    title: "Whispers in the Woods",
    content: "Deep in the forest, campers hear strange whispers that lead them to...",
    author: "ScaryScribe",
    likes: 20,
    comments: 8,
    category: "Wilderness",
  },
]

const hauntedPlaces: HauntedPlace[] = [
  {
    name: "Bran Castle",
    location: "Transylvania, Romania",
    description: "Also known as Dracula's Castle, this medieval fortress is said to be haunted by various spirits.",
    imageUrl: "https://yvpkuiuqmhfkgxpjhwgg.supabase.co/storage/v1/object/public/images/bran-castle.jpg",
  },
  {
    name: "Winchester Mystery House",
    location: "San Jose, California, USA",
    description: "A mansion famous for its size, architectural curiosities, and lack of any master building plan.",
    imageUrl: "https://yvpkuiuqmhfkgxpjhwgg.supabase.co/storage/v1/object/public/images/winchester-mystery-house.jpg",
  },
]

export function GhostStoriesArchive() {
  const [stories, setStories] = useState<Story[]>(initialStories)
  const [newStory, setNewStory] = useState<Omit<Story, 'id' | 'likes' | 'comments' | 'author'>>({ title: "", content: "", category: "" })
  const [activeTab, setActiveTab] = useState("stories")

  const addStory = () => {
    if (newStory.title && newStory.content && newStory.category) {
      setStories([
        ...stories,
        {
          id: stories.length + 1,
          ...newStory,
          author: "Anonymous",
          likes: 0,
          comments: 0,
        },
      ])
      setNewStory({ title: "", content: "", category: "" })
      setActiveTab("stories")
    }
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stories">Ghost Stories</TabsTrigger>
          <TabsTrigger value="places">Haunted Places</TabsTrigger>
          <TabsTrigger value="submit">Submit a Story</TabsTrigger>
        </TabsList>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="stories">
              <div className="grid gap-4 md:grid-cols-2">
                {stories.map((story) => (
                  <Card key={story.id} className="bg-gray-900 border-gray-700">
                    <CardHeader>
                      <CardTitle>{story.title}</CardTitle>
                      <CardDescription>{story.author} | {story.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3">{story.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="ghost" size="sm">
                        <Flame className="w-4 h-4 mr-2" />
                        {story.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {story.comments}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="places">
              <div className="grid gap-4 md:grid-cols-2">
                {hauntedPlaces.map((place) => (
                  <Card key={place.name} className="bg-gray-900 border-gray-700">
                    <CardHeader>
                      <CardTitle>{place.name}</CardTitle>
                      <CardDescription>{place.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img src={place.imageUrl} alt={place.name} className="w-full h-48 object-cover mb-4 rounded" />
                      <p>{place.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="submit">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle>Submit Your Ghost Story</CardTitle>
                  <CardDescription>Share your spooky experience with the world!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Story Title"
                    value={newStory.title}
                    onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                  />
                  <Input
                    placeholder="Category (e.g., Haunted Houses, Wilderness)"
                    value={newStory.category}
                    onChange={(e) => setNewStory({ ...newStory, category: e.target.value  })}
                  />
                  <Textarea
                    placeholder="Your ghost story..."
                    value={newStory.content}
                    onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
                  />
                </CardContent>
                <CardFooter>
                  <Button onClick={addStory}>
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Story
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}