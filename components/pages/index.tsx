import Head from 'next/head';
import EmotionForm from '../components/EmotionForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Emotion Reflection Tool</title>
      </Head>
      <main className="min-h-screen bg-white p-4">
        <h1 className="text-center text-2xl font-bold mb-4">Emotion Reflection Tool</h1>
        <EmotionForm />
      </main>
    </>
  );
}
