"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

const curseWords = {
  object: ["socks", "coffee", "phone", "keys", "hair"],
  adjective: ["damp", "itchy", "loud", "sparkly", "invisible"],
  action: ["sneeze", "laugh", "blink", "hiccup", "yawn"],
  consequence: ["a cat will meow", "glitter will appear", "your shoes will squeak", "time will slow down", "your hair will change color"],
  bodyPart: ["nose", "elbow", "knee", "ear", "pinky finger"],
  verb: ["twitch", "glow", "shrink", "tickle", "sing"],
  mysticalEntity: ["the Great Pumpkin", "the Ghost of Wi-Fi Past", "the Sock-Eating Dryer Monster", "the Caffeine Fairy", "the Eternal Buffering Wheel"],
  adverb: ["awkwardly", "majestically", "sneakily", "dramatically", "unnecessarily"],
  possession: ["favorite mug", "lucky charm", "beloved pet", "prized collection", "secret stash"],
  emotion: ["mild inconvenience", "slight annoyance", "unexpected giggles", "random dance urges", "spontaneous pun outbursts"],
}

export function CurseGenerator() {
  const [name, setName] = useState("")
  const [curse, setCurse] = useState("")

  const generateCurse = () => {
    if (!name) return

    const template = curseTemplates[Math.floor(Math.random() * curseTemplates.length)]
    const filledCurse = template.replace(/{(\w+)}/g, (_, key) => {
      const words = curseWords[key as keyof typeof curseWords]
      return words[Math.floor(Math.random() * words.length)]
    })

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
            transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
            className="p-4 bg-orange-800 rounded-lg"
          >
            <p className="text-lg font-semibold">{curse}</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}