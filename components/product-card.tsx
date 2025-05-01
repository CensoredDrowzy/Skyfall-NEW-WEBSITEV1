import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ProductCardProps {
  name: string
  description: string
  price: string
  status: "Undetected" | "Detected" | "Updating"
  image: string
}

export default function ProductCard({ name, description, price, status, image }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge
          className={`absolute top-2 right-2 z-20 ${
            status === "Undetected" ? "bg-green-500" : status === "Detected" ? "bg-red-500" : "bg-yellow-500"
          }`}
        >
          {status}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-zinc-500 text-sm mt-1">{description}</p>
        <p className="text-lg font-bold mt-2 text-[#6074f4]">{price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-[#6074f4] hover:bg-[#4a5fd0]">
          <Link href={`/products/${name.toLowerCase().replace(/\s+/g, "-")}`}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Purchase
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
