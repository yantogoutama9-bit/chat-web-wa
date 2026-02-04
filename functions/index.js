const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * Unread Admin 100% akurat (server-side)
 * - Customer message => unreadAdmin +1
 * - Admin message => unreadAdmin = 0
 * - Update lastMessage, lastSender, lastMessageAt, updatedAt
 */
exports.onNewMessage = functions.firestore
  .document("supportChats/{chatId}/messages/{msgId}")
  .onCreate(async (snap, context) => {
    const { chatId } = context.params;
    const data = snap.data() || {};

    const role = data.role || "customer";
    const text = (data.text || "").toString().slice(0, 500);

    const chatRef = db.collection("supportChats").doc(chatId);

    if (role === "customer") {
      await db.runTransaction(async (tx) => {
        const chatSnap = await tx.get(chatRef);
        const chatData = chatSnap.exists ? chatSnap.data() : {};

        const prevUnread =
          typeof chatData.unreadAdmin === "number" ? chatData.unreadAdmin : 0;

        tx.set(
          chatRef,
          {
            chatId,
            unreadAdmin: prevUnread + 1,
            lastSender: "customer",
            lastMessage: text,
            lastMessageAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            status: chatData.status || "open",
            label: chatData.label || "NEW",
          },
          { merge: true }
        );
      });

      return null;
    }

    if (role === "admin") {
      await chatRef.set(
        {
          chatId,
          unreadAdmin: 0,
          lastSender: "admin",
          lastMessage: text,
          lastMessageAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          status: "open",
        },
        { merge: true }
      );

      return null;
    }

    return null;
  });
