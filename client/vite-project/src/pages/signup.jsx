import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import axiosInstance from '../axiosCalls/axios'

const fields = [
    { number: '01', name: 'fullname', label: 'Full name', placeholder: 'What should we call you?' },
    { number: '02', name: 'phone', label: 'Phone', placeholder: 'Your phone number', type: 'tel' },
    { number: '03', name: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email' },
    { number: '04', name: 'password', label: 'Password', placeholder: 'Something only you know', type: 'password' }
]

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease }
    }
}

const Field = memo(({ field, value, onChange, reduced }) => (
    <motion.label
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : {
            duration: 0.4,
            delay: 0.08 + Number(field.number) * 0.045,
            ease
        }}
        className="group relative block border-t border-white/[0.07] py-5"
    >
        <div className="flex items-start gap-4">
            <span className="w-5 pt-1 text-[9px] font-mono text-white/20">
                {field.number}
            </span>

            <div className="flex-1">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/40">
                    {field.label}
                </span>

                <input
                    type={field.type || 'text'}
                    name={field.name}
                    value={value}
                    onChange={onChange}
                    placeholder={field.placeholder}
                    autoComplete={
                        field.name === 'password'
                            ? 'new-password'
                            : field.name
                    }
                    required
                    className="
                        w-full bg-transparent py-1
                        text-[15px] tracking-[-0.01em] text-white
                        outline-none
                        placeholder:text-white/13
                    "
                />
            </div>
        </div>

        <span className="
            absolute -bottom-px left-0 h-px w-0
            bg-white/60
            transition-[width] duration-500 ease-out
            group-focus-within:w-full
        " />
    </motion.label>
))

function Signup() {
    const reduced = useReducedMotion()

    const [form, setForm] = useState({fullname: '',phone: '',email: '',password: ''})
    const [loader, setLoader] = useState(false)
    const [err, setErr] = useState(null)

    const handleChange = ({ target }) => {
        setForm(prev => ({ ...prev, [target.name]: target.value}))
        if (err) setErr(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (loader) return

        setLoader(true)
        setErr(null)

        try {
            const res = await axiosInstance.post('/customers/register', form)
            console.log(res)
            console.log('User Registered')
        } catch (error) {
            setErr(error?.response?.data?.message || error.message)
            console.log(error.message)
        } finally {
            setLoader(false)
        }
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#111112] text-[#E7E7E9]">

            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-10%] top-[-35%] h-212.5 w-212.5 rounded-full bg-white/2.5 blur-[160px]" />
                <div className="absolute bottom-[-40%] right-[-10%] h-200 w-200 rounded-full bg-white/1.8 blur-[160px]" />

                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px'
                    }}
                />

                <div
                    className="absolute inset-0 opacity-[0.025] mix-blend-soft-light"
                    style={{
                        backgroundImage: `
                            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")
                        `
                    }}
                />
            </div>

            {/* Header */}
            <header className="absolute inset-x-0 top-0 z-20 flex h-20 items-center justify-between px-8 md:px-12">
                <div className="flex items-center gap-3">
                    <motion.span
                        initial={reduced ? false : { scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.45, ease }}
                        className="h-2 w-2 rounded-full bg-[#E7E7E9]"
                    />

                    <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">
                        Create account
                    </span>
                </div>

                <span className="text-[10px] uppercase tracking-[0.2em] text-white/20"> 
                    2026 / 001
                </span>
            </header>

            <section className="relative mx-auto flex min-h-screen max-w-350 items-center px-8 pb-16 pt-28 md:px-12 lg:px-20">

                <div className="grid w-full items-center gap-16 lg:grid-cols-[1fr_520px] lg:gap-28">

                    {/* Editorial side */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="relative hidden lg:block"
                    >
                        <p className="mb-8 text-[10px] uppercase tracking-[0.3em] text-white/25">
                            A small beginning
                        </p>

                        <h1 className="select-none text-[clamp(90px,11vw,175px)] font-semibold leading-[0.78] tracking-[-0.075em] text-white/94">
                            CREATE
                            <br />
                            <span className="text-white/9">YOURSELF.</span>
                        </h1>

                        <div className="mt-16 flex max-w-90 items-start gap-5">
                            <span className="mt-1 h-px w-8 shrink-0 bg-white/20" />

                            <p className="text-xs leading-6 text-white/30">
                                Everything starts somewhere.
                                <br />
                                This is yours.
                            </p>
                        </div>

                        <span className="absolute -bottom-16 left-0 text-[9px] tracking-[0.25em] text-white/15">
                            BEGIN / 001
                        </span>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={reduced ? { duration: 0 } : { duration: 0.65, delay: 0.1, ease }}
                        className="w-full max-w-130 lg:ml-auto"
                    >
                        <div className="mb-10 lg:hidden">
                            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/25">
                                A small beginning
                            </p>

                            <h1 className="text-6xl font-semibold tracking-[-0.06em]">
                                CREATE<span className="text-white/15">.</span>
                            </h1>
                        </div>

                        <div className="relative">
                            <span className="absolute -top-px left-0 h-px w-16 bg-white/50" />

                            <div className="border border-white/8 bg-white/2.5 p-7 backdrop-blur-2xl md:p-9">

                                <div className="mb-9 flex items-end justify-between">
                                    <div>
                                        <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-white/25">
                                            New identity
                                        </p>

                                        <h2 className="text-xl font-medium tracking-[-0.02em]">
                                            Let's get you in.
                                        </h2>
                                    </div>

                                    <span className="text-[10px] text-white/20">
                                        04 fields
                                    </span>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div>
                                        {fields.map(field => (
                                            <Field
                                                key={field.name}
                                                name={field.name}
                                                field={field}
                                                value={form[field.name]}
                                                onChange={handleChange}
                                                reduced={reduced}
                                            />
                                        ))}
                                    </div>

                                    {err && (
                                        <motion.div
                                            initial={reduced ? false : { opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-5 overflow-hidden border border-red-400/10 bg-red-400/[0.035] px-4 py-3"
                                        >
                                            <p className="text-xs text-red-300/70">
                                                {err}
                                            </p>
                                        </motion.div>
                                    )}

                                    <motion.button
                                        type="submit"
                                        disabled={loader}
                                        whileTap={reduced || loader ? undefined : { scale: 0.985 }}
                                        whileHover={reduced || loader ? undefined : { y: -1 }}
                                        transition={{ duration: 0.18 }}
                                        className="
                                            group relative mt-7 flex h-14 w-full
                                            items-center justify-center overflow-hidden
                                            bg-[#E7E7E9] text-[#111112]
                                            transition-colors duration-300
                                            hover:bg-white
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                                    >
                                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
                                            {loader ? 'Creating account...' : 'Create account'}
                                        </span>

                                        <span className="absolute right-5 text-lg transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </motion.button>

                                    <div className="mt-6 flex items-center justify-between">
                                        <span className="text-[10px] text-white/20">
                                            Already here?
                                        </span>

                                        <Link
                                            to="/login"
                                            className="text-[10px] uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-white focus:outline-none focus:text-white"
                                        >
                                            Log in ↗
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="mt-5 flex justify-between px-1">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-white/15">
                                Secure registration
                            </span>

                            <span className="text-[9px] font-mono text-white/10">
                                / SIGNUP
                            </span>
                        </div>
                    </motion.div>

                </div>
            </section>
        </main>
    )
}

export default Signup