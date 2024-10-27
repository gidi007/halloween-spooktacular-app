"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wand2 } from "lucide-react"

const curseTemplates = [
  "May your {object} always be slightly {adjective}!",
  "Whenever you {action}, {consequence} shall follow!",
  "From this day forth, your {bodyPart} will {verb} at the most inconvenient times!",
  "By the power of {mysticalEntity}, I curse thee to forever {verb} {adverb}!",
  "Let your {possession} bring you nothing but {emotion} for all eternity!",
]

export function CurseGenerator() {
  const [name, setName] = useState("")
  const [curse, setCurse] = useState("")

  const generateCurse = () => {
    if (!name) return

    const template = curseTemplates[Math.floor(Math.random() * curseTemplates.length)]
    const filledCurse = template
      .replace("{object}", ["socks", "coffee", "phone", "keys", "hair"][Math.floor(Math.random() * 5)])
      .replace("{adjective}", ["damp", "itchy", "loud", "sparkly", "invisible"][Math.floor(Math.random() * 5)])
      .replace("{action}", ["sneeze", "laugh", "blink", "hiccup", "yawn"][Math.floor(Math.random() * 5)])
      .replace("{consequence}", ["a cat will meow", "glitter will appear", "your shoes will squeak", "time will slow down", "your hair will change color"][Math.floor(Math.random() * 5)])
      .replace("{bodyPart}", ["nose", "elbow", "knee", "ear", "pinky finger"][Math.floor(Math.random() * 5)])
      .replace("{verb}", ["twitch", "glow", "shrink", "tickle", "sing"][Math.floor(Math.random() * 5)])
      .replace("{mysticalEntity}", ["the Great Pumpkin", "the Ghost of Wi-Fi Past", "the Sock-Eating Dryer Monster", "the Caffeine Fairy", "the Eternal Buffering Wheel"][Math.floor(Math.random() * 5)])
      .replace("{adverb}", ["awkwardly", "majestically", "sneakily", "dramatically", "unnecessarily"][Math.floor(Math.random() * 5)])
      .replace("{possession}", ["favorite mug", "lucky charm", "beloved pet", "prized collection", "secret stash"][Math.floor(Math.random() * 5)])
      .replace("{emotion}", ["mild inconvenience", "slight annoyance", "unexpected giggles", "random dance urges", "spontaneous pun outbursts"][Math.floor(Math.random() * 5)])

    setCurse(`${name}, ${filledCurse}`)
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle>Curse Generator</CardTitle>
        <CardDescription>Generate a spooky (and slightly silly) curse!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Enter a name:</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Who shall be cursed?"
          />
        </div>
        <Button onClick={generateCurse}>
          <Wand2 className="w-4 h-4 mr-2" />
          Generate Curse
        </Button>
        {curse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 bg-orange-800 rounded-lg"
          >
            <p className="text-lg font-semibold">{curse}</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}