<script lang="ts">
  import { onMount } from 'svelte';
  import Multiselect from 'svelte-multiselect';

  interface Question {
    id: number;
    text: string;
    topic: string;
    answer: string;
  }

  interface Data {
    questions: Question[];
  }

  let { data }: { data: Data } = $props();
  let question = $state(1);
  let revealed = $state(false);
  let selectedTopics: string[] = $state([]);
  let topics: string[] = $state([]);

  onMount(() => {
    if (data && data.questions) {
      topics = [...new Set(data.questions.map(q => q.topic))]; // Ensure unique topics
    }
  });

  function handleClick() {
    const filteredQuestions = data.questions.filter(q => selectedTopics.length === 0 || selectedTopics.includes(q.topic));
    question = Math.floor(Math.random() * filteredQuestions.length);
    revealed = false;
  }

  function reveal() {
    revealed = true;
    console.log('reveal');
  }
</script>

{#if data && data.questions && data.questions.length > 0}
  <div class="max-w-lg mx-auto p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200">
    <h3 class="text-xl text-gray-700 font-bold mb-4">Flashcard</h3>
    
    <Multiselect bind:selected={selectedTopics} options={topics} placeholder="Select topics..." />

    <div class="bg-white p-6 rounded-lg shadow-inner border border-gray-100 min-h-64">
      <p class="text-lg font-medium text-gray-800">
        <span class="text-indigo-600 font-bold">{data.questions[question].id}.</span> 
        {data.questions[question].text}
      </p>
      
      {#if revealed}
        <div class="mt-6 pt-4 border-t border-gray-200">
          <p class="text-lg font-medium text-emerald-700">{data.questions[question].answer}</p>
        </div>
      {:else}
        <div class="flex items-center justify-center mt-6 h-10">
          <div class="w-24 h-1 bg-gray-200 rounded"></div>
        </div>
      {/if}
    </div>
    
    <div class="flex flex-wrap gap-3 mt-6">
      <button 
        class="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium transition-all hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-400 focus:outline-none" 
        onclick={reveal}>
        Reveal Answer
      </button>
      
      <button 
        class="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium transition-all hover:bg-emerald-700 hover:shadow-md focus:ring-2 focus:ring-emerald-400 focus:outline-none" 
        onclick={handleClick}>
        Next Card
      </button>
    </div>
    
    <div class="mt-4 text-center text-sm text-gray-500">
      Card {question + 1} of {data.questions.filter(q => selectedTopics.length === 0 || selectedTopics.includes(q.topic)).length}
    </div>
  </div>
{:else}
  <div class="max-w-lg mx-auto p-6 bg-red-50 rounded-xl shadow-lg border border-red-100">
    <div class="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-red-700 font-medium">No questions available</p>
    </div>
  </div>
{/if}