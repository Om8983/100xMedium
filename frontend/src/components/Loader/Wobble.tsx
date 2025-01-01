import { motion } from "motion/react"


export const Wobble = () => {

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <svg style={{ position: "absolute" }} width="200" height="200" viewBox="0 0 133 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    opacity={'50%'}
                    animate={{
                        d: ['M33.4868 30.2917C2.48625 37.2917 - 4.51362 59.7917 2.48683 69.7917C9.48727 79.7917 36.3047 119.062 68.9867 120.792C90.8786 121.95 107.791 118.998 121.987 102.292C135.65 86.2126 132.487 49.2917 132.487 49.2917C132.487 49.2917 125.387 14.8294 108.487 4.29172C82.1817 - 12.1096 64.4874 23.2917 33.4868 30.2917Z',
                            'M34.0629 2.49992C3.06235 9.49992 -3.93743 71 3.06301 81C10.0635 91 33.3812 116.271 66.0632 118C87.9551 119.158 100.805 129.678 115 112.972C128.663 96.8931 115 53.5 115 53.5C115 53.5 108.964 37.0377 92.0632 26.5C65.7582 10.0987 65.0635 -4.50008 34.0629 2.49992Z',
                            'M40.2779 15.6157C9.2773 22.6157 -5.2724 62.1157 1.72805 72.1157C8.72849 82.1157 4.04546 113.386 36.7275 115.116C58.6194 116.274 102.535 110.822 116.731 94.1157C130.393 78.0366 127.228 59.1157 127.228 59.1157C127.228 59.1157 123.128 17.1533 106.228 6.61564C79.9226 -9.78565 71.2784 8.61572 40.2779 15.6157Z'
                        ]
                    }}
                    transition={{
                        duration: 3,
                        ease: 'easeInOut',
                        repeatType: 'reverse',
                        repeat: Infinity
                    }}
                    fill="url(#paint0_linear_723_9)" />
                <defs>
                    <linearGradient id="paint0_linear_723_9" x1="66.4018" y1="0" x2="66.4018" y2="121.015" gradientUnits="userSpaceOnUse">
                        <stop offset="0.235" stopColor="#F9A1CE" />
                        <stop offset="1" stopColor="#FFEAF5" />
                    </linearGradient>
                </defs>
            </svg>
            <svg style={{ position: "absolute", mixBlendMode: "multiply" }} width="200" height="200" viewBox="0 0 117 137" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    opacity={'60%'}
                    animate={{
                        d: ["M35.3016 15.2678C13.4715 37.7416 14.9707 41.7416 9.47125 52.2417C3.9718 62.7419 -12.1974 103.267 16.8018 129.768C35.3009 146.673 80.3021 126.268 102.801 112.268C120.716 101.12 116.301 79.3833 116.301 79.3833C116.301 79.3833 119.702 25.8055 102.801 15.2678C76.4961 -1.13346 57.1318 -7.20595 35.3016 15.2678Z",
                            "M48.5 3.49985C13.5 6.49973 3.02621 27.1746 3.02621 40.6747C3.02621 54.1748 -8.00014 75.9994 20.999 102.5C39.4982 119.405 87.511 124.002 102.999 102.5C116.242 84.1153 111 91.4999 111 91.4999C111 91.4999 119 51 111 22.9999C102.566 -6.51826 83.5 0.499967 48.5 3.49985Z",
                            "M68.5312 5.93781C34.0624 -8.12433 11.4993 7.49985 5.50007 20C-0.499126 32.5001 -5.33908 54.1861 17.0002 86.5C29.444 104.5 26.1613 106.327 59.4999 111.5C88.5004 116 103 89.9999 103 89.9999C103 89.9999 121 75 113 46.9999C104.566 17.4818 103 19.9999 68.5312 5.93781Z"
                        ]
                    }}
                    transition={{
                        duration: 3,
                        ease: 'easeInOut',
                        repeatType: 'reverse',
                        repeat: Infinity
                    }}
                    fill="url(#paint0_linear_723_20)" />
                <defs>
                    <linearGradient id="paint0_linear_723_20" x1="-32.1949" y1="41.8619" x2="-32.1949" y2="162.877" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#DE5AFF" />
                        <stop offset="0.21" stopColor="#E786FF" />
                        <stop offset="0.55" stopColor="#F6D1FF" />
                        <stop offset="1" stopColor="#F7F7F7" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="text-xl ">Loading...</div>

        </div>
    )
}
