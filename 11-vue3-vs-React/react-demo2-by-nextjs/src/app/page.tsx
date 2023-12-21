import Image from 'next/image'
import styles from './page.module.css'



export default function Home() {
    function abc(event, num) {
        return undefined
    }
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <p>
                    Get started by editing&nbsp;
                    <code className={styles.code}>src/app/page.tsx</code>
                </p>
            </div>

            <div className={styles.center}>
                <Image
                    className={styles.logo}
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={180}
                    height={37}
                    priority
                />
            </div>

            <div className={styles.grid}>
                <button onClick = {event=>abc(event, 11)}>这是一个button</button>
            </div>
        </main>
    )
}
