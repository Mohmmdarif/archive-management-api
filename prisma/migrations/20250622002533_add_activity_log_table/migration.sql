-- CreateTable
CREATE TABLE "ActivityLogDeletion" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "remarks" TEXT,

    CONSTRAINT "ActivityLogDeletion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActivityLogDeletion" ADD CONSTRAINT "ActivityLogDeletion_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
