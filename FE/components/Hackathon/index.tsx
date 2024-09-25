
'use client'
import { Tabs, Tab, Card, CardBody, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import Leaderboard from "../Leaderboard";
import TimeIcon from "@/asset/icon/TimeIcon";
interface IMyHackathon {
    id: number;
    title: string;
    image: string;
    timeStart: string;
    timeEnd: string;
    status: string;
    rank: number;
}

export default function Hackathon() {
    const [selected, setSelected] = useState("allHackathon");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedItem, setSelectedItem] = useState<IMyHackathon>({
        id: 1,
        title: 'Race 1: 5K Fun Run',
        image: "https://th.bing.com/th/id/OIP.HPRn0m__rRe18Rs3j4wkrQHaH_?w=173&h=187&c=7&r=0&o=5&pid=1.7",
        timeStart: '01/01/2024 00:00',
        timeEnd: '12/12/2024 00:00',
        status: 'upcoming',
        rank: 23
    });
    const myHackathon = [
        {
            id: 1,
            title: 'Race 1: 5K Fun Run',
            image: "https://th.bing.com/th/id/OIP.HPRn0m__rRe18Rs3j4wkrQHaH_?w=173&h=187&c=7&r=0&o=5&pid=1.7",
            timeStart: '01/01/2024 00:00',
            timeEnd: '12/12/2024 00:00',
            status: 'upcoming',
            rank: 23
        },
        {
            id: 2,
            title: 'Race 2: 10K Challenge',
            image: "https://th.bing.com/th/id/OIP.SUFrYYQSpoEjiUcsg10rRwHaHa?rs=1&pid=ImgDetMain",
            timeStart: '01/01/2024 00:00',
            timeEnd: '12/12/2024 00:00',
            status: 'ongoing',
            rank: 24
        },
        {
            id: 3,
            title: 'Race 3: Half Marathon',
            image: "https://th.bing.com/th/id/OIP.1uXtoUUGbs72yCVrIL9prQHaH0?w=178&h=187&c=7&r=0&o=5&pid=1.7",
            timeStart: '01/01/2024 00:00',
            timeEnd: '12/12/2024 00:00',
            status: 'completed',
            rank: 56
        },
    ]

    const AllHackathon = [
        {
            id: 1,
            title: 'Race 1: 5K Fun Run',
            joining: 100,
            image: "https://th.bing.com/th/id/OIP.HPRn0m__rRe18Rs3j4wkrQHaH_?w=173&h=187&c=7&r=0&o=5&pid=1.7",
            timeStart: '01/01/2024 00:00',
            timeEnd: '12/12/2024 00:00',
            status: 'upcoming'
        },
        {
            id: 2,
            title: 'Race 2: 10K Challenge',
            joining: 200,
            image: "https://th.bing.com/th/id/OIP.SUFrYYQSpoEjiUcsg10rRwHaHa?rs=1&pid=ImgDetMain",
            timeStart: '01/01/2024 00:00',
            timeEnd: '12/12/2024 00:00',
            status: 'ongoing'
        },
        {
            id: 3,
            title: 'Race 3: Half Marathon',
            joining: 300,
            image: "https://th.bing.com/th/id/OIP.1uXtoUUGbs72yCVrIL9prQHaH0?w=178&h=187&c=7&r=0&o=5&pid=1.7",
            timeStart: '01/01/2024 00:00',
            timeEnd: '12/12/2024 00:00',
            status: 'completed'
        },
        {
            id: 4,
            title: 'Race 5: End of Marathon',
            joining: 400,
            image: "https://th.bing.com/th/id/OIP.2id1rOvG2mH1os0sVFUUNgHaHa?w=188&h=187&c=7&r=0&o=5&pid=1.7",
            timeStart: '01/01/2024 00:00',
            timeEnd: '12/12/2024 00:00',
            status: 'completed'
        },
    ]

    function formatDateTimeToLocaleString(date: Date): string {
        return date.toLocaleString('en-GB'); // Adjust locale as needed
    }

    const joinHackathon = (data: any) => {
        console.log(data);
        toast.success('You are join ' + data.title + ' successful! Start time at ' + formatDateTimeToLocaleString(new Date()));
    }

    const viewLeaderboard = (item: any) => {
        setSelectedItem(item);
        onOpen();
    }

    return (
        <>
            <div className="flex w-full flex-col mt-5">
                <Tabs
                    aria-label="Options"
                    color="primary"
                    classNames={{
                        cursor: "bg-primary text-white",
                        tabContent: "group-data-[selected=true]:text-white"
                    }}
                    selectedKey={selected}
                    onSelectionChange={(e: any) => setSelected(e.key)}
                >
                    <Tab key="myHackathon" title="My Champion">
                        <Card className="bg-white">
                            <CardBody>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {myHackathon.map(item => (
                                        <Card className="py-4">
                                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                                <p className="text-tiny uppercase font-bold">{item.status}</p>
                                                <small className="text-default-500">Your rank: {item.rank}</small>
                                                <h4 className="font-bold text-large">{item.title}</h4>
                                            </CardHeader>
                                            <CardBody className="overflow-visible py-2">
                                                <Image
                                                    alt="Card background"
                                                    className="object-cover rounded-xl"
                                                    src={item.image}
                                                    width={270}
                                                />
                                            </CardBody>
                                            <CardFooter className="bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">

                                                <div className="flex items-center gap-1">
                                                    <TimeIcon />
                                                    <span className="text-[10px] font-medium text-[#81819C]">{item.timeStart} - {item.timeEnd}</span>
                                                </div>

                                                <Button className="text-tiny" color="primary" radius="full" size="sm" onPress={() => viewLeaderboard(item)}>
                                                    Leaderboard
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="allHackathon" title="All Champion">
                        <Card className="bg-white">
                            <CardBody>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {AllHackathon.map(item => (
                                        <Card className="py-4">
                                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                                <p className="text-tiny uppercase font-bold">{item.status}</p>
                                                <small className="text-default-500">Number of Participants: {item.joining}</small>
                                                <h4 className="font-bold text-large">{item.title}</h4>
                                            </CardHeader>
                                            <CardBody className="overflow-visible py-2">
                                                <Image
                                                    alt="Card background"
                                                    className="object-cover rounded-xl"
                                                    src={item.image}
                                                    width={270}
                                                />
                                            </CardBody>
                                            <CardFooter className="bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                                                <div className="flex items-center gap-1">
                                                    <TimeIcon />
                                                    <span className="text-[10px] font-medium text-[#81819C]">{item.timeStart} - {item.timeEnd}</span>
                                                </div>
                                                <Button className="text-tiny" color="primary" radius="full" size="sm" onPress={() => joinHackathon(item)}>
                                                    Join
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
                <Modal
                    size="lg"
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Leaderboard of {selectedItem.title}</ModalHeader>
                                <ModalBody>
                                    <Leaderboard />
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <Toaster />
            </div>
        </>

    )
}