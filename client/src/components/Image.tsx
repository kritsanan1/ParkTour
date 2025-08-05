import styles from "@/styles/Image.module.css";

interface ImageProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Image({ className, children }: ImageProps) {
  return (
    <div className={`${styles.Image_201_7293} ${className || ""}`}>
      {children}
    </div>
  );
}