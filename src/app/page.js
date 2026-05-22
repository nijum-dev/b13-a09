import Cards from "@/components/Cards";
import ExtraOne from "@/components/ExtraOne";
import ExtraTwo from "@/components/ExtraTwo";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
   <div>

     <Hero></Hero>
        <Cards></Cards>
        <ExtraOne></ExtraOne>
        <ExtraTwo></ExtraTwo>
   </div>
  );
}
