'use client'

import UserTabs from '@/components/layout/UserTabs'
import { useProfile } from '@/components/UseProfile'
import { dbTimeForHuman } from '@/libs/dateTime'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const { data: profile } = useProfile()

  useEffect(() => {
    fetchOrders()
  }, [])

  function fetchOrders() {
    setLoadingOrders(true)
    fetch('/api/orders').then((res) => {
      res.json().then((orders) => {
        setOrders(orders.reverse())
        setLoadingOrders(false)
      })
    })
  }

  // const paidOrders = orders.filter((order) => order.paid)
  // const unpaidOrders = orders.filter((order) => !order.paid)

  return (
    <section className="max-w-lg  mx-auto mt-8">
      <UserTabs isAdmin={profile.admin} />
      <div className=" mt-8">
        {loadingOrders && <div>Loading orders...</div>}
        <div>
          {orders?.length > 0 &&
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-200 rounded-lg px-4 py-3 mb-2 flex flex-col sm:flex-row items-center gap-3"
              >
                <div className="grow sm:flex items-center gap-4">
                  <div>
                    <div
                      className={
                        (order.paid ? 'bg-green-500' : 'bg-red-500') +
                        ' rounded-md p-2 w-20 text-center text-white'
                      }
                    >
                      {order.paid ? 'Paid' : 'Not Paid'}
                    </div>
                  </div>
                  <div className="grow">
                    <div className="flex gap-2 items-center mb-1">
                      <div className="grow">{order.userEmail}</div>
                      <div className="text-gray-500 text-sm">
                        {dbTimeForHuman(order.createdAt)}
                      </div>
                    </div>
                    <div className="text-gray-500 text-xs">
                      {order.cartProducts.map((p) => p.name).join(', ')}
                    </div>
                  </div>
                </div>
                <div className="justify-end flex gap-2 items-center whitespace-nowrap text-sm">
                  <Link className="button" href={'/orders/' + order._id}>
                    Show order
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
