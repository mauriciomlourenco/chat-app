import { ButtonBase, FormControl, TextField, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { object, string } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from "react"
import { UserContext } from "../../contexts/user-context"
import { useNavigate } from "react-router-dom"

export function Login(){
    const { handleLogin } = useContext(UserContext)
    const router = useNavigate()

    const formLoginSchema = object({
        name: string().min(1, {
            message: 'Nome obrigatório',
        }),
        numberConnections: string().min(1, {
            message: 'Número de conexões obrigatório',
        })
    })

    type FormLoginData = Zod.infer<typeof formLoginSchema>

    const {
        register,
        formState: { errors /*, isSubmitSuccessful*/ },
        // reset,
        handleSubmit,
    } = useForm<FormLoginData>({
        resolver: zodResolver(formLoginSchema),
    })

    const handleSubmitLogin: SubmitHandler<FormLoginData> = (data) => {
        console.log(data)
        handleLogin(data.name, data.numberConnections)
        router('/chats')
    }
    

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-green-medium">
            <Typography sx={{ color: 'white', fontSize: '3rem', mb: '2rem' }}>Chat-app</Typography>
            <form 
                onSubmit={handleSubmit(handleSubmitLogin)}
                noValidate
                className="flex min-w-[22rem] flex-col gap-2 bg-white p-8 rounded shadow-md"
            >
                <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <TextField
                        id="name"
                        label="Nome"
                        type="text"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        {...register('name')}
                    />
        

            
                    <TextField
                        id="numberConections"
                        label="Número de conexões"
                        type="number"
                        error={!!errors.numberConnections}
                        helperText={errors.numberConnections?.message}
                        {...register('numberConnections')} 
                    />
        

                <ButtonBase
                    type="submit"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        bgcolor: 'rgba(0, 108, 121, 1)',
                        px: '1rem',
                        py: '0.375rem',
                        borderRadius: '0.25rem',                        
                        ml: 'auto',
                        mt: '1rem',                        
                        '&:hover': {
                            bgcolor: 'rgba(0, 108, 121, 0.85)',
                            filter: 'alpha(opacity=70)',
                            transition: "all 0.2s ease-in-out",
                            shadow: '0px 4px 4px rgba(0, 0, 0, 1)'
                        }
                    }}
                >
                    <span className="text-white text-lg">Entrar</span>
                </ButtonBase>
                </FormControl>
            </form>
        </div>
    )
}