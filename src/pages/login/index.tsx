import { ButtonBase, FormControl, TextField } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { object, string } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'

export function Login(){

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
    }
    

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-slate-500">
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
                    }}
                >
                    <span>Entrar</span>
                </ButtonBase>
                </FormControl>
            </form>
        </div>
    )
}