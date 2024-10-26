"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SpookyTarotReader } from "./spooky-tarot-reader"
import { GhostStoriesArchive } from "./ghost-stories-archive"
import { ParanormalInvestigator } from "./paranormal-investigator"
import { CurseGenerator } from "./curse-generator"
import { Ghost, Cards, Radar, Skull } from "lucide-react"

export function HalloweenSpooktacularComponent() {
  const [activeFeature, setActiveFeature] = useState(null)

  const features = [
    { id: "tarot", name: "Spooky Tarot", icon: Cards, component: SpookyTarotReader },
    { id: "stories", name: "Ghost Stories", icon: Ghost, component: GhostStoriesArchive },
    { id: "investigator", name: "Paranormal Investigator", icon: Radar, component: ParanormalInvestigator },
    { id: "curse", name: "Curse Generator", icon: Skull, component: CurseGenerator },
  ]

  return (
    <div className="min-h-screen bg-orange-900 text-orange-100 p-4 flex flex-col">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-4xl font-bold text-center text-orange-300 mb-8"
      >
        Halloween Spooktacular
      </motion.h1>
      
      <div className="flex-grow flex flex-col md:flex-row gap-4">
        <Card className="bg-orange-950 border-orange-600 md:w-64 flex-shrink-0">
          <CardContent className="p-4">
            <nav className="space-y-2">
              {features.map((feature) => (
                <Button
                  key={feature.id}
                  variant={activeFeature === feature.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <feature.icon className="mr-2 h-4 w-4" />
                  {feature.name}
                </Button>
              ))}
            </nav>
          </CardContent>
        </Card>

        <AnimatePresence mode="wait">
          {activeFeature ? (
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-grow"
            >
              <Card className="bg-orange-950 border-orange-600 h-full">
                <CardContent className="p-6">
                  {features.find(f => f.id === activeFeature)?.component()}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-grow flex items-center justify-center"
            >
              <p className="text-2xl text-orange-300">Select a spooky feature to begin!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}