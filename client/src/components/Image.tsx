import styles from "@/styles/Image.module.css";
import heroImage from '@assets/wang-yai-park-hero_1754404819577.jpg';

interface ImageProps {
  className?: string;
  children?: React.ReactNode;
  alt?: string;
  priority?: boolean;
}

export default function Image({ 
  className, 
  children, 
  alt = "Wang Yai Park - Beautiful nature scenery in Wang Sam Mo District, Udon Thani, Thailand - วังใหญ่ปาร์ค ธรรมชาติสวยงามในอำเภอวังสามหมอ อุดรธานี",
  priority = false 
}: ImageProps) {
  return (
    <div className={`${styles.Image_201_7293} ${className || ""}`}>
      <img 
        src={heroImage}
        alt={alt}
        className={styles.heroBackground || "absolute inset-0 w-full h-full object-cover"}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        width="1920"
        height="1080"
      />
      {children}
    </div>
  );
}