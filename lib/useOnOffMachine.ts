import { useState } from "react"

export type OnOffMachine = {
  turnOn(): void
  turnOff(): void
  toggle(): void
  isOn: boolean
  isOff: boolean
}

/**
 * A simple-atomic boolean state machine.
 * @param isMachineOnByDefault If true, set `machine.isOn=true`
 * @default isMachineOnByDefault false
 */
function useOnOffMachine(isMachineOnByDefault: boolean = false): OnOffMachine {
  const [isOn, setIsOn] = useState(isMachineOnByDefault)
  const turnOn = () => setIsOn(true)
  const turnOff = () => setIsOn(false)
  const toggle = () => setIsOn((state) => !state)

  return {
    turnOn,
    turnOff,
    toggle,
    isOn,
    isOff: !isOn,
  }
}

export default useOnOffMachine
