import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type RegisterInfo = {
  name: string
  email: string
  password: string
}

type UserState = {
  registerInfo: RegisterInfo
  addRegisterInfo: (info: RegisterInfo) => void
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        registerInfo: { email: '', name: '', password: '' },
        addRegisterInfo: (info) => set({ registerInfo: info }),
      }),
      {
        name: 'register-info',
      }
    )
  )
)

export default useUserStore
